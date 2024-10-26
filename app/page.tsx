import OrderForm from "@/components/OrderForm";
import Cover from "@/components/cover";
import { getOptions } from "@/lib/actions";

export default async function Home() {
  const productOptions = await getOptions();

  return (
    <div className="m-10 grid place-content-center">
      <Cover />
      <h1 id="form-title" className="mt-8 inline-flex text-3xl font-bold">
        Order Form
      </h1>
      {productOptions ? (
        <OrderForm productOptions={productOptions.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export const dynamic = "force-dynamic";
