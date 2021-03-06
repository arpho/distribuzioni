import { ItemServiceInterface } from "./ItemServiceInterface";
export class QuickAction {
  icon: string;
  title: string;
  description: string;
  action: (params: {
    router: any;
    alertCtrl: any;
    Service: ItemServiceInterface;
  }) => void;
  constructor(args: {
    icon: string;
    title: string;
    description: string;
    action: (params: {
      router: any;
      alertCtrl: any;
      Service?: ItemServiceInterface;
    }) => void;
  }) {
    this.title = args.title;
    this.icon = args.icon;
    this.description = args.description;
    this.action = args.action;
  }

  getTitle() {
    return this.title;
  }

  getAction() {
    return this.action;
  }

  getIcon() {
    return this.icon;
  }

  getDescription() {
    return this.description;
  }
}
