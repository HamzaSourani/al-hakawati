import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Z from "zod";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

import { SendHorizonalIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

const defaultValues: Z.infer<typeof formSchema> = {
  name: "",
  ageCategory: "1",
  isParent: "0",
  isDeaf: "0",
};
const formSchema = Z.object({
  name: Z.string({ required_error: "الرجاء إدخال اسم الطفل" }).min(3, {
    message: "الأسم يجب ان يوكن مؤالف من ثلاث محارف على الاقل",
  }),
  ageCategory: Z.enum(["1", "2"]),
  isParent: Z.string(),
  isDeaf: Z.string(),
}).refine(
  (data) => {
    console.log(
      !(data.isParent === "1" && data.isDeaf === "1"),
      "data from schema"
    );
    return !(data.isParent === "1" && data.isDeaf === "1");
  },
  {
    message: "لا يمكن اختيار نمط الاب في حال كان الابن اصم",
    path: ["isParent"],
  }
);
const fakeApi = (params: Z.infer<typeof formSchema>) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(params);
    }, 1000);
  });
const SubscribeForm = () => {
  const navigate = useNavigate();

  const form = useForm<Z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSendUserEmail = async (values: Z.infer<typeof formSchema>) => {
    try {
      const res = await fakeApi(values);
      localStorage.setItem("userInfo", JSON.stringify(res));
      form.reset();
      navigate("/");
    } catch (error) {}
  };
  return (
    <div className="flex flex-col justify-center items-center gap-8 rounded-xl bg-white/50 py-8 px-16 backdrop-blur-sm min-h-[60vh]   ">
      <h1 className="text-xl md:text-2xl  lg:text-3xl font-bold">
        قم بتسجيل الدخول للتمتع باروع قصص الاطفال
      </h1>
      <Form {...form}>
        <form
          className="flex flex-col w-full h-full justify-center  gap-8"
          onSubmit={form.handleSubmit(handleSendUserEmail)}
        >
          <div className="grid   grid-cols-1 justify-center  gap-4  md:grid-cols-2">
            <FormField
              control={form.control}
              name="ageCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عمر الطفل</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="إختر الفئة العمرية" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">4 / 7</SelectItem>
                      <SelectItem value="2">8/12</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>{"الأسم"}</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder={"قم بادخال الأسم"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isDeaf"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>هل الطفل اصم؟</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"1"} />
                        </FormControl>
                        <FormLabel className="font-normal">نعم </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"0"} />
                        </FormControl>
                        <FormLabel className="font-normal">لا </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isParent"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>نمط القصة</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={"1"} />
                        </FormControl>
                        <FormLabel className="font-normal">نمط الاب </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="0" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          نمط الابن{" "}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" ">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              size={"sm"}
            >
              {"تسجيل دخول"}
              {form.formState.isSubmitting ? (
                <LoaderCircleIcon className="mr-2 w-4 animate-spin fill-secondary " />
              ) : (
                <SendHorizonalIcon className="mr-2 w-4 fill-secondary" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default SubscribeForm;
