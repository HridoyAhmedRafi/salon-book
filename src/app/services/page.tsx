import { Navbar } from "@/components/shared/Navbar";
import { getServices } from "@/lib/admin-apis/get/services";

const BrowseServies = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(search)) {
    if (typeof value === "string") {
      query.set(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    }
  }

  const queryString = query.toString();
  const result = await getServices(queryString);
  console.log(result);

  return (
    <div>
      <Navbar></Navbar>
      <h1>BrowseServies</h1>
      <h1>{}</h1>
    </div>
  );
};

export default BrowseServies;
