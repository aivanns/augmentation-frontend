import { useEffect } from 'react';
import { socketService } from '../../api/socket';

export const useSocket = () => {
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return socketService;
}; 