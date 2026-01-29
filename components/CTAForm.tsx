"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner"; 

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  projectType: z.string().min(1, "Please select a project type"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const projectTypes = [
  { value: "reels", label: "Reels & Short Content" },
  { value: "longform", label: "Long-form Videos" },
  { value: "motion", label: "Motion Graphics" },
  { value: "ai-video", label: "AI Video" },
  { value: "featured", label: "Featured Projects" },
];

export default function CTAForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      projectType: "",
      description: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    
    toast.promise(
      fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (response) => {
        const result = await response.json();
        
        if (!response.ok) {
          throw new Error(result.error || "Something went wrong");
        }
        
        form.reset();
        return result;
      }),
      {
        loading: "Sending your message... 📤",
        success: "Message sent! 🎬 We'll get back to you within 24 hours.",
        error: "Failed to send. Please try again or email us directly.",
      }
    );

    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start max-w-6xl mx-auto">
          
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Let's Work
                <br />
                <span className="text-gradient-primary">Together</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-md">
                Tell us about your project — we'll craft visuals that elevate your 
                brand and captivate your audience.
              </p>
            </div>

          
            <div className="space-y-4 pt-4">
              <a
                href="mailto:hello@kreativewerbunglabs.com"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>hello@kreativewerbunglabs.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span>+91 98765 43210</span>
              </a>

              <div className="flex items-center gap-4 text-foreground">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-secondary" />
                </div>
                <span>Delhi, India</span>
              </div>
            </div>

            
            <div className="flex items-center gap-4 pt-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-11 h-11 rounded-full glass-card flex items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/40 via-transparent to-secondary/30 rounded-2xl blur-sm" />
            
            <div className="relative glass-card rounded-2xl p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            className="h-12 bg-transparent border-0 border-b  rounded-none px-0 border-primary focus-visible:ring-0 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="h-12 bg-transparent border-0 border-b border-border/50 rounded-none px-0 border-primary focus-visible:ring-0 transition-colors"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-muted-foreground">
                          Project Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full h-12 bg-transparent border-0 border-b border-border/50 rounded-none px-0 border-primary focus:ring-0">
                              <SelectValue placeholder="Select project type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            {projectTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2 w-full">
                      <FormLabel className="text-sm font-medium text-muted-foreground">
                        Project Brief
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your project..."
                          {...field}
                          className="min-h-[120px] w-full bg-transparent border-0 border-b border-border/50 rounded-none px-0 border-primary focus-visible:ring-0 resize-none block"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                  
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 h-auto rounded-full bg-foreground text-background font-heading text-base font-semibold hover:bg-foreground/90"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full mr-3"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Project Request
                          <Send className="w-4 h-4 ml-3" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>

        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-border mt-20 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 max-w-6xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold">
              <span className="text-gradient-primary">KREATIVE</span>
              <span className="text-foreground"> WERBUNG</span>
            </span>
            <span className="text-muted-foreground">LABS</span>
          </div>

          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kreative Werbung Labs. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
}