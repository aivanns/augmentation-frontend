import { socketService } from '../../../shared/api/socket';

export const dashboardSocket = {
  onResult: (callback: (result: string) => void) => {
    socketService.on('result', callback);
  },

  onError: (callback: (error: string) => void) => {
    socketService.on('error', callback);
  },

  offResult: () => {
    socketService.off('result');
  },

  offError: () => {
    socketService.off('error');
  }
};