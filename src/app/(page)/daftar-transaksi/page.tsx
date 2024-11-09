"use client";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/fragments/Navbar";
import { AllProductDropdown } from "@/components/core/Dropdown/all-product";
import { DatePicker } from "@/components/core/Button/date-picker";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function DaftarTransaksi() {
  return (
    <div className="mt-20">
      <Navbar />
      <div className="mx-10 grid">
        <p className="text-3xl font-bold m-10">Daftar Transaksi</p>
        <div className="space-y-10 rounded-lg border-4 border-[#D9D9D9] px-10 py-5 shadow-md">
          <div className="grid grid-cols-3 gap-5">
            <Input type="email" placeholder="Search" />
            <AllProductDropdown />
            <DatePicker />
          </div>
          <div className={cn(`flex items-center gap-8`)}>
            <p>Status</p>
            <Button variant={"outline"}>Semua</Button>
            <Button variant={"outline"}>Berlangsung</Button>
            <Button variant={"outline"}>Berhasil</Button>
            <Button variant={"outline"}>Batal</Button>
            <p>reset filter</p>
          </div>

          <div className="rounded-lg border border-[#D9D9D9] shadow-md">
            <div className="flex items-center gap-10 bg-[#D9D9D9] px-10 py-5">
              <FontAwesomeIcon icon={faBagShopping} className="text-4xl" />
              <p>Belanja</p>
              <p>10 June 2022</p>
              <p className={`rounded-lg bg-[#A3D3BD] p-2`}>selesai</p>
              <p>INV/20229999</p>
            </div>
            <div className="grid grid-cols-2 p-10">
              <div className="space-y-5">
                <div className="flex items-center gap-5">
                  <Image
                    src="/assets/image/claw.png"
                    width={20}
                    height={20}
                    alt="Claw Image"
                  ></Image>
                  <p>Scratch Store</p>
                </div>
                <div className="flex gap-8">
                  <Image
                    src="/assets/image/headset.png"
                    width={70}
                    height={70}
                    alt="Claw Image"
                  />
                  <ul>
                    <li>
                      <p>HEADPHONE ATH-M50X - HITAM</p>
                    </li>
                    <li>
                      <p>1 barang x Rp299.999</p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid gap-5">
                <ul className="grid grid-cols-3 gap-3 text-end">
                  <li className="col-span-2">
                    <p>Total Belanja</p>
                    <p>Rp319.999</p>
                  </li>
                </ul>
                <div className="grid grid-cols-3 items-center gap-3">
                  <Button
                    variant={"ghost"}
                    className={cn(`mx-auto w-full rounded-xl`)}
                  >
                    Lihat Detail Transaksi
                  </Button>
                  <Button
                    variant={"outline"}
                    className={cn(
                      `mx-auto w-full rounded-xl bg-[#A3D3BD] hover:bg-[#76c8a4]`,
                    )}
                  >
                    Beli Lagi
                  </Button>
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    className="mx-5 text-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}