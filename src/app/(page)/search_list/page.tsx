"use client";

import { useState, useEffect } from "react";
import Card from "@/components/core/Card/search_list";
import Navbar from "@/components/fragments/Navbar/index";
import Footer from "@/components/fragments/Footer/index";
import SideBar from "@/components/fragments/Sidebar/ProductList";
import searchProductsByName from "@/app/api/search_list/product";
import ProductPreview from "@/app/lib/model/product_review";
import SearchListSkeleton from "@/components/core/Card/SearchListSkeleton";

import "@/app/assets/css/home.css";

export default function Keranjang() {
  const [products, setProducts] = useState<ProductPreview[]>([]);
  const [filters, setFilters] = useState<any>({});

  const handleFilterSubmit = (newFilters: any) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const applyFilters = async () => {
      const data = await searchProductsByName(filters);
      setProducts(data);
    };

    applyFilters();
  }, [filters]);

  return (
    <div className="">
      <Navbar />
      <div className="container mx-auto mt-28 flex justify-center">
        <div className="flex w-full">
          <div className="fixed mb-5 w-1/5">
            <SideBar onSubmitFilters={handleFilterSubmit} params="" />
          </div>

          <div className="ml-80 w-full p-5">
            <p className="mb-2 font-semibold">
              Menampilkan 1 - {products.length} dari total barang untuk "Seluruh
              Kategori"
            </p>

            <div className="pb-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.length === 0
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <div key={index}>
                        <SearchListSkeleton />
                      </div>
                    ))
                  : products.map((product, index) => (
                      <Card
                        key={index}
                        product_id={product.product_id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        imageUrl={product.image_url}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {products.length > 0 && (
        <div className="ml-[22.2rem]">
          <Footer />
        </div>
      )}
    </div>
  );
}
