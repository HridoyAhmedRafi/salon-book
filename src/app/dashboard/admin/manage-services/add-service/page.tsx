"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ImagePlus,
  Scissors,
  Clock,
  DollarSign,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function AddServiceForm() {
  const router = useRouter();
  const [image, setImage] = useState("");

  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-full justify-center px-4 py-8 md:px-8 md:py-10">
      <div className="w-full max-w-5xl space-y-7">
        {/* Back Navigation */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {/* Heading */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#d1234c]">
            <Scissors className="size-5" />
            <span className="text-sm font-medium">Service Management</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Add New Service
          </h1>

          <p className="text-sm text-muted-foreground">
            Create a new salon service and make it available for customers.
          </p>
        </div>

        {/* Form */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="border-b border-border/60 px-6 py-6 md:px-8">
            <CardTitle className="text-xl">Service Information</CardTitle>

            <CardDescription>
              Enter the details of your new salon service.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 py-7 md:px-8 md:py-9">
            <form className="space-y-7">
              {/* Service Name */}
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>

                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="e.g. Hair Styling & Treatment"
                  className="h-11"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>

                <select
                  id="category"
                  name="category"
                  required
                  defaultValue=""
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:border-[#d1234c] focus-visible:ring-2 focus-visible:ring-[#d1234c]/20"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Hair">Hair</option>
                  <option value="Skin">Skin Care</option>
                  <option value="Nails">Nail Care</option>
                  <option value="Makeup">Makeup</option>
                  <option value="Spa">Spa & Massage</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the service, its benefits and what customers can expect..."
                  className="min-h-36 resize-y"
                  required
                />
              </div>

              {/* Price & Duration */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (৳)</Label>

                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3.5 size-4 text-muted-foreground" />

                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      placeholder="e.g. 1500"
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>

                  <div className="relative">
                    <Clock className="absolute left-3 top-3.5 size-4 text-muted-foreground" />

                    <Input
                      id="duration"
                      name="duration"
                      type="number"
                      min="1"
                      placeholder="e.g. 60"
                      className="h-11 pl-9"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-3">
                <Label htmlFor="image">Service Image URL</Label>

                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://example.com/service-image.jpg"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="h-11"
                  required
                />

                {image ? (
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src={image}
                      alt="Service preview"
                      fill
                      sizes="(max-width: 768px) 100vw, 1024px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-muted/30 text-muted-foreground">
                    <ImagePlus className="size-10" />

                    <p className="text-sm">Image preview will appear here</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-border/60 pt-6 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="sm:min-w-32"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="bg-[#d1234c] text-white hover:bg-[#b91f43] sm:min-w-40"
                >
                  Add Service
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
