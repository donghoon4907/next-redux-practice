import { faker } from '@faker-js/faker';

// export type Person = {
//     firstName: string;
//     lastName: string;
//     age: number;
//     visits: number;
//     progress: number;
//     status: 'relationship' | 'complicated' | 'single';
//     subRows?: Person[];
// };

export type Employee = {
    id: string;
    division: {
        id: string;
        name: string;
    };
    contract: {
        id: string;
        num: number;
        title: string;
    };
    occurrenceAt: Date;
    createdAt: Date;
    responseAt: Date;
    content: string;
    writer: {
        id: string;
        login_id: string;
        name: string;
    };
    status: string;
    subRows?: Employee[];
};

const range = (len: number) => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i);
    }
    return arr;
};

const newPerson = (): Employee => {
    return {
        id: faker.datatype.uuid(),
        division: {
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
        },
        contract: {
            id: faker.datatype.uuid(),
            num: faker.datatype.number(40),
            title: faker.vehicle.model(),
        },
        occurrenceAt: faker.date.between({
            from: '2020-01-01',
            to: '2030-01-01',
        }),
        createdAt: faker.date.between({ from: '2020-01-01', to: '2030-01-01' }),
        responseAt: faker.date.between({
            from: '2020-01-01',
            to: '2030-01-01',
        }),
        content: faker.vehicle.model(),
        writer: {
            id: faker.datatype.uuid(),
            login_id: faker.helpers.shuffle<string>([
                'A1523',
                'B1523',
                'C1523',
            ])[0]!,
            name: faker.name.firstName(),
        },
        status: faker.helpers.shuffle<string>(['진행중', '종결'])[0]!,
    };
};

export function makeData(...lens: number[]) {
    const makeDataLevel = (depth = 0): Employee[] => {
        const len = lens[depth]!;
        return range(len).map((d): Employee => {
            return {
                ...newPerson(),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            };
        });
    };

    return makeDataLevel();
}
