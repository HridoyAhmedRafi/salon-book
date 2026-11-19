import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/apis/get/services";
import Link from "next/link";
import React from "react";

const ManageServices = async () => {
  const allServices = await getServices();
  
  return (
    <div>
      <Link href={"manage-services/add-service"}>
        <Button className={"cursor-pointer"}>Add Service</Button>
      </Link>
      Manage Services
    </div>
  );
};

export default ManageServices;
