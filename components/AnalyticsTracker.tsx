
// Fix: Use standard modular Firebase imports
import React, { useEffect, useRef } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

interface AnalyticsTrackerProps {
  currentView: string;
}

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({ currentView }) => {
  const startTimeRef = useRef<number>(Date.now());
  const viewRef = useRef<string>(currentView);
  const clicksRef = useRef<string[]>([]);

  // Helper to get or create a session ID
  const getSessionId = () => {
    let sessionId = sessionStorage.getItem('lenda_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('lenda_session_id', sessionId);
    }
    return sessionId;
  };

  useEffect(() => {
    // 1. Click Listener to track interactions
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if user clicked a button or link (or inside one)
      const clickable = target.closest('button, a');
      if (clickable) {
        const element = clickable as HTMLElement;
        // Get text content or aria label, truncate if too long
        const label = (element.innerText || element.getAttribute('aria-label') || element.tagName).trim().substring(0, 30);
        if (label) {
          clicksRef.current.push(label);
        }
      }
    };

    window.addEventListener('click', handleClick);

    // 2. Logic to log data when view changes or unloads
    const logData = () => {
      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000; // in seconds
      const previousView = viewRef.current;
      // Snapshot the clicks array to avoid reference changes
      const clicks = [...clicksRef.current];

      // Only log if duration is significant (> 1s) to avoid noise
      if (duration > 1) {
        const logsRef = ref(db, 'analytics/logs');
        push(logsRef, {
          page: previousView,
          duration: Math.round(duration),
          timestamp: endTime,
          sessionId: getSessionId(),
          // Firebase throws on 'undefined', use 'null' to indicate no value
          clicks: clicks.length > 0 ? clicks : null
        }).catch(err => console.error("Analytics Error", err));
      }
    };

    // 3. Reset for new view
    // Log previous view before resetting
    if (viewRef.current !== currentView) {
        logData();
    }
    
    startTimeRef.current = Date.now();
    viewRef.current = currentView;
    clicksRef.current = []; // Reset clicks for new page

    // 4. Handle window close/refresh
    const handleUnload = () => {
       logData();
    };

    window.addEventListener('beforeunload', handleUnload);
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleUnload);
    };

  }, [currentView]);

  return null; // Invisible component
};
