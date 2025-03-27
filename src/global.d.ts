// global.d.ts
interface BootstrapModal {
    hide: () => void;
  }
  
  interface Bootstrap {
    Modal: {
      getInstance: (element: HTMLElement) => BootstrapModal | null;
    };
  }
  
  interface Window {
    bootstrap: Bootstrap;
  }
  