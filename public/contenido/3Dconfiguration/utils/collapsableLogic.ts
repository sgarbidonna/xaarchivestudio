class CollapsibleManager {
    private static instance: CollapsibleManager;
    private currentlyOpenCollapsible: HTMLDivElement | null = null;
  
    private constructor() {}
  
    public static getInstance(): CollapsibleManager {
      if (!CollapsibleManager.instance) {
        CollapsibleManager.instance = new CollapsibleManager();
      }
      return CollapsibleManager.instance;
    }
  
    public toggleCollapsible(newCollapsible: HTMLDivElement) {
      if (this.currentlyOpenCollapsible && this.currentlyOpenCollapsible !== newCollapsible) {
        this.closeCollapsible(this.currentlyOpenCollapsible);
      }
  
      if (newCollapsible.classList.contains("active")) {
        this.closeCollapsible(newCollapsible);
      } else {
        this.openCollapsible(newCollapsible);
      }
    }
  
    private openCollapsible(collapsible: HTMLDivElement) {
      collapsible.nextElementSibling?.classList.add("show");
      collapsible.classList.add("active");
      this.currentlyOpenCollapsible = collapsible;
    }
  
    private closeCollapsible(collapsible: HTMLDivElement) {
      collapsible.nextElementSibling?.classList.remove("show");
      collapsible.classList.remove("active");
      this.currentlyOpenCollapsible = null;
    }
  }
  
  export const collapsibleManager = CollapsibleManager.getInstance();
  