import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const formAction = async (formData: FormData) => {
    "use server";
    const itemName = String(formData.get("item-name"));

    await db.orm.public.Item.create({
      itemName,
    });

    revalidatePath("/");
  };

  const getItems = async () => {
    "use cache";
    return await db.orm.public.Item.all();
  };

  const items = await getItems();

  return (
    <main>
      <h1>Home</h1>
      <form action={formAction}>
        <label htmlFor="item-name">Item Name</label>
        <input type="text" name="item-name" id="item-name" />
        <button>Add</button>
      </form>
      <ul>
        {items.map((item) => {
          return <li key={item.id}>{item.itemName}</li>;
        })}
      </ul>
    </main>
  );
}
