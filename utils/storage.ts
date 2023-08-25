import type { CoreLinkTabOption } from '@interfaces/core';

export class TabModule {
    private tabs: CoreLinkTabOption[] = [];

    constructor() {
        this.initialize();
    }

    private save() {
        sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
    }

    initialize() {
        const storedItems = sessionStorage.getItem('tabs');

        this.tabs = storedItems ? JSON.parse(storedItems) : [];
    }

    create(item: CoreLinkTabOption): void {
        const index = this.tabs.findIndex((tab) => tab.id === item.id);
        if (index === -1) {
            this.tabs.push(item);
            this.save();
        }
    }

    read(id: string): CoreLinkTabOption | undefined {
        return this.tabs.find((item) => item.id === id);
    }

    update(id: string, updatedItem: Partial<CoreLinkTabOption>): void {
        const index = this.tabs.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.tabs[index] = { ...this.tabs[index], ...updatedItem };
            this.save();
        }
    }

    remove(id: string): void {
        const index = this.tabs.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.tabs.splice(index, 1);
            this.save();
        }

        return;
    }

    getAll(): CoreLinkTabOption[] {
        return this.tabs;
    }
}
