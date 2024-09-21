"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  AuctionUpdateSchema,
  TypeAuctionUpdateSchema,
} from "@/schemas/auctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Auction } from "@/types/autions";
import toast from "react-hot-toast";
import { updateAuctionById } from "@/actions/auction";
import { Loader2 } from "lucide-react";

interface Props {
  auction?: Auction;
  id: string;
}
const AuctionFormUpdate = ({ auction, id }: Props) => {
  const router = useRouter();
  const form = useForm<TypeAuctionUpdateSchema>({
    resolver: zodResolver(AuctionUpdateSchema),
    defaultValues: {
      make: auction?.make,
      model: auction?.model,
      color: auction?.color,
      mileage: auction?.mileage,
      year: auction?.year,
    },
    mode: "onTouched",
  });
  const onSubmit = async (value: TypeAuctionUpdateSchema) => {
    try {
      const res = await updateAuctionById(id, value);
      // console.log(id,value)
      if (res.error) {
        throw res.error;
      }
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Can't create `Auctions`");
    }
  };
  useEffect(() => {
    form.setFocus("make");
    if (auction) {
      const { make, model, mileage, year, color } = auction;
      form.reset({ make, model, mileage, year, color });
    }
  }, [form, auction]);
  if(form.formState.isSubmitSuccessful){
    toast.success("Updated Successful",{position:'top-right',className:'tracking-tighter font-semibold'})
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Make</FormLabel>
                <FormControl>
                  <Input placeholder="Your Make " {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Your Model " {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Input placeholder="Your Color " {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="mileage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mileage</FormLabel>
                <FormControl>
                  <Input placeholder="Your Mileage" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <FormControl>
                  <Input placeholder="Your Year " {...field} />
                </FormControl>
                <FormDescription>Your Year Ex. 1998</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="w-full flex justify-between">
          <Button variant={"destructive"} onClick={() => router.push("/")}>
            Cancle
          </Button>
          <Button disabled={form.formState.isSubmitting} variant={"outline"} type="submit">
            {!form.formState.isSubmitting ? 'Submit' : <><Loader2 className="w-3 h-3 mr-2 animate-spin" /> please wait</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuctionFormUpdate;
