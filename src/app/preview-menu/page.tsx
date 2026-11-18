import MobileMenuPanel from "@/components/user-session/MobileMenuPanel";

const MenuPreviewPage = () => {
  return (
    <main className="flex min-h-[70vh] items-start justify-center p-10">
      <MobileMenuPanel
        user={{
          name: "Jane Doe",
          email: "jane@example.com",
          image: null,
          role: "customer",
        }}
      />
    </main>
  );
};

export default MenuPreviewPage;
