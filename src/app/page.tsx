import { db } from "@/prisma/db";
import { connection } from "next/server";

export default async function Home() {
  await connection();

  const formAction = async (formData: FormData) => {
    "use server";

    const name = String(formData.get("name"));
    const username = String(formData.get("username"));
    const email = String(formData.get("email"));
    console.log({ name, username, email });
  };

  // Prisma 8
  // await db.orm.public.User.create({ name, username, email });
  // const users = await db.orm.public.User.all();

  // console.log(users);

  // Prisma docs - https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql
  // Also throws error
  // async function main() {
  //   const users = await db.orm.public.User.select("id", "email", "name")
  //     .limit(2)
  //     .all();
  //   console.log(users);
  //   await db.close();
  // }
  // main().catch((error) => {
  //   console.error(error);
  //   process.exit(1);
  // });

  return (
    <main>
      <h1>Home Page</h1>;
      <div className="user-form">
        <h2>Create User</h2>
      </div>
      <form action={formAction}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
        <button className="btn">Create User</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
