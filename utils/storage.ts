import type { CoreMenuOption } from '@interfaces/core';

export class TabModule {
    private tabs: CoreMenuOption[];

    constructor() {
        const storedItems = sessionStorage.getItem('tabs');

        this.tabs = storedItems ? JSON.parse(storedItems) : [];
    }

    private save() {
        sessionStorage.setItem('tabs', JSON.stringify(this.tabs));
    }

    create(item: CoreMenuOption): void {
        const index = this.tabs.findIndex((tab) => tab.id === item.id);
        if (index === -1) {
            this.tabs.push(item);
            this.save();
        }
    }

    read(id: string): CoreMenuOption | undefined {
        return this.tabs.find((item) => item.id === id);
    }

    update(id: string, updatedItem: CoreMenuOption): void {
        const index = this.tabs.findIndex((item) => item.id === id);
        if (index !== -1) {
            this.tabs[index] = { ...updatedItem, id };
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

    getAll(): CoreMenuOption[] {
        return this.tabs;
    }
}
