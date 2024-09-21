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
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import {
  AuctionCreateSchema,
  TypeAuctionCreateSchema,
} from "@/schemas/auctions";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { createAction } from "@/actions/auction";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Auction } from "@/types/autions";

interface Props {
  auction?: Auction;
}
const AuctionForm = ({ auction }: Props) => {
  const router = useRouter();
  const form = useForm<TypeAuctionCreateSchema>({
    resolver: zodResolver(AuctionCreateSchema),
    defaultValues: {
      make: "",
      model: "",
      color: "",
      mileage: "",
      year: "",
      imageUrl: "",
      auctionEnd: new Date(Date.now()),
      reservePrice: "",
    },
    mode: "onTouched",
  });
  const onSubmit = async (value: TypeAuctionCreateSchema) => {
    // console.log(value);
    try {
      const res = await createAction(value);
      if (res.error) {
        throw res.error;
      }
      const id = res.id;
      if (res.error) {
        throw res.error;
      }
      router.push(`/auctions/details/${id}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error("Can't create `Auctions` ");
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
    toast.success("Created Successful",{position:'top-right',className:'tracking-tighter font-semibold'})
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

          <FormField
            control={form.control}
  
            name="reservePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reserve Price</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your Reserve Price "
                    {...field}
                    type="number"
                  />
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

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL|PATH</FormLabel>
              <FormControl>
                <Input placeholder="Your Image URL|PATH" {...field} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="auctionEnd"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full">
              <FormLabel>Date of Auction End</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your Date of Auction End</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-between">
          <Button variant={"destructive"} onClick={() => router.push("/")}>
            Cancle
          </Button>
          <Button disabled={form.formState.isSubmitting} variant={"outline"} type="submit">
            {!form.formState.isSubmitting ? 'Submit' : <><Loader2 className="w-3 h-3 mr-2" /> please wait</>}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AuctionForm;
