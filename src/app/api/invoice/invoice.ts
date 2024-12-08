import { db } from "@/app/lib/firebase";
import { InvoiceData } from "@/app/lib/model/invoice";
import Product from "@/app/lib/model/product";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";

export default async function invoice({
  userId,
}: {
  userId: string;
}): Promise<InvoiceData[] | null> {
  try {
    const transactionCollection = collection(db, "transaksi");
    const q = query(transactionCollection, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No transactions found for this user");
      return null;
    }

    const transactions: (InvoiceData | null)[] = await Promise.all(
      querySnapshot.docs.map(async (docs) => {
        const transactionData = docs.data();

        // Check if product_id is an array
        if (!Array.isArray(transactionData.product_id)) {
          console.error(
            "product_id is not an array:",
            transactionData.product_id,
          );
          return null; // or handle this case as needed
        }

        // Fetch product details for each product_id
        const products: (Product | null)[] = await Promise.all(
          transactionData.product_id.map(async (id) => {
            const productRef = doc(db, "product", id.id);
            const productSnap = await getDoc(productRef);
            if (productSnap.exists()) {
              return {
                product_id: productSnap.id,
                ...productSnap.data(),
              } as Product;
            } else {
              console.error("Product not found for ID:", id);
              return null;
            }
          }),
        );

        // Filter out null products
        const filteredProducts: Product[] = products.filter(
          (product): product is Product => product !== null,
        );

        const createdAt =
          transactionData.created_at instanceof Timestamp
            ? transactionData.created_at.toDate().toISOString()
            : new Date().toISOString();

        const updatedAt =
          transactionData.updated_at instanceof Timestamp
            ? transactionData.updated_at.toDate().toISOString()
            : new Date().toISOString();

        return {
          address: transactionData.address,
          amount: transactionData.amount,
          color: transactionData.color,
          created_at: createdAt,
          current_price: transactionData.current_price,
          ekspedisi_id: transactionData.ekspedisi_id,
          paid_amount: transactionData.paid_amount,
          payer_email: transactionData.payer_email,
          payment_channel: transactionData.payment_channel,
          payment_method: transactionData.payment_method,
          product_id: transactionData.product_id,
          recipient: transactionData.recipient,
          shippingCost: transactionData.shippingCost,
          shippingETA: transactionData.shippingETA,
          shippingName: transactionData.shippingName,
          status: transactionData.status,
          telepon: transactionData.telepon,
          totalQuantity: transactionData.totalQuantity,
          transaksi_id: transactionData.transaksi_id,
          updated_at: updatedAt,
          user_id: transactionData.user_id,
          variant: transactionData.variant,
          products: filteredProducts,
        } as InvoiceData;
      }),
    );

    // Filter out any null transactions
    return transactions.filter(
      (transaction): transaction is InvoiceData => transaction !== null,
    );
  } catch (e) {
    console.error("Error fetching transactions:", e);
    return null;
  }
}
