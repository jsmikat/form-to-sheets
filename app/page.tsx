import OrderForm from "@/components/OrderForm";
import { getOptions } from "@/lib/actions";

export default async function Home() {
  const productOptions = await getOptions();

  return (
    <div className="m-10 grid place-content-center">
      <h1 className="text-4xl font-bold">Customer Details</h1>
      {productOptions ? (
        <OrderForm productOptions={productOptions.data} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
