import Link from "next/link";

type Props = {
  price?: number;
  href?: string;
};

export default function PaymentButton({ price, href }: Props) {
  const rupiah = new Intl.NumberFormat("en-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      <Link href={`${href}`}>
        <button
          className={`bg-[#EC78FF] bg-opacity-10 outline outline-[#EC78FF] rounded-full py-4 px-[55px] price-black w-[314px] h-[62px] flex items-center gap-5 justify-center mt-9`}
        >
          <svg
            width="32"
            height="26"
            viewBox="0 0 32 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3326 16.8333V8.63003M6.29412 1H16.0015C16.0566 2.96537 17.6671 4.54167 19.6458 4.54167C21.6245 4.54167 23.2351 2.96537 23.2902 1H25.7059C28.6297 1 31 3.37026 31 6.29412V19.4287C31 22.3526 28.6297 24.7229 25.7059 24.7229H23.2902C23.2351 22.7575 21.6245 21.1812 19.6458 21.1812C17.6671 21.1812 16.0566 22.7575 16.0015 24.7229H6.29414C3.37028 24.7229 1.00002 22.3526 1.00002 19.4287L1 6.29412C1 3.37026 3.37026 1 6.29412 1Z"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {price !== undefined ? rupiah.format(price) : "Rp 0"}
        </button>
      </Link>
    </>
  );
}