import { collection, doc, DocumentData, Firestore, setDoc } from "@angular/fire/firestore";
import { Guide } from "../app/models/guide.model";
import { Unit } from "../app/models/unit.model";

export const GUIDE1_ID = 'g-001', UNIT1_ID = 'u-001', UNIT2_ID = 'u-002';

export async function seedData(store: Firestore) {
    async function setData<T extends DocumentData & { id: string }>(path: string, data: T) {
        const colRef = collection(store, path);
        const docRef = doc(colRef, data.id);
        await setDoc(docRef, data);
    }

    await setData<Guide>('guides', { id: GUIDE1_ID, lang: 'en', title: 'guide', order: 0, domain: 'localhost', caption: 'caption', overview: 'overview', description: 'description' });
    await setData<Unit>(`guides/${GUIDE1_ID}/units`, { id: UNIT1_ID, title: 'unit #1', order: 0, caption: 'caption 1', description: 'description 1' });
    await setData<Unit>(`guides/${GUIDE1_ID}/units`, { id: UNIT2_ID, title: 'unit #2', order: 0, caption: 'caption 2', description: 'description 2' });
}