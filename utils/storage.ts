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
        // active된 탭이 가장 앞에 오도록 변경(2023-11-01)
        this.tabs.sort((a, b) => {
            const { pathname } = location;

            if (a.id === pathname) {
                return -1;
            } else if (b.id === pathname) {
                return 1;
            } else {
                return 0;
            }
        });

        return this.tabs;
    }
}
