"use server";
import React from "react";
import { CirclePlus, LucideImageOff, ExternalLink, Edit2 } from "lucide-react";
import { getImages } from "@/lib/googleDriveAdmin";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const ProductCard = ({
  product: {
    name,
    productURL,
    productID,
    price,
    main_image,
    available,
    salePrice,
  },
}) => (
  <Card className="group overflow-hidden">
    <CardHeader className="p-0">
      <div className="relative">
        {main_image ? (
          <div className="relative h-80 w-full overflow-hidden">
            <Image
              src={main_image.webContentLink}
              alt={name}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="h-48 w-full flex justify-center items-center bg-secondary">
            <LucideImageOff className="text-muted-foreground" size={48} />
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/admin/products/addProduct?productURL=${productURL}`}
                className="absolute top-2 right-2"
              >
                <Button size="icon" variant="secondary">
                  <Edit2 className="w-4 h-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Product</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </CardHeader>

    <CardContent className="p-4 space-y-4">
      <div className="space-y-2">
        <h3 className="font-semibold text-lg line-clamp-2 uppercase">{name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            {salePrice > 0 ? salePrice : price} DZD
          </span>
          {salePrice > 0 && (
            <Badge variant="secondary" className="line-through">
              {price} DA
            </Badge>
          )}
        </div>
      </div>
    </CardContent>

    <CardFooter className="p-4 pt-0 flex items-end ">
      <Link
        href={`../../products/${productURL}`}
        className="w-full "
        target="_blank"
      >
        <Button variant="outline" className="w-full group  ">
          View Page
          <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </CardFooter>
  </Card>
);

const ProductGrid = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getAdminProducts`,
    {
      cache: "no-store",
    }
  ).then((res) => res.json());
  const unformatedProducts = res.body;

  const products = await Promise.all(
    unformatedProducts.map(async (product) => {
      const images = await getImages(product.productID);
      return {
        ...product,
        main_image: images.images.find((image) => image.name.includes("main_")),
        images: images.images,
      };
    })
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">
              Manage and organize your products
            </p>
          </div>
          <Link href="/admin/products/addProduct">
            <Button className="gap-2 text-xl">
              <CirclePlus className="h-8 w-h-8" />
              Add Product
            </Button>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[600px] gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary animate-pulse" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
