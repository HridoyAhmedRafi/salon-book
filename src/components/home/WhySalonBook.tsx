import { BadgeCheck, CalendarCheck, Wallet } from "lucide-react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Expert Stylists",
    description:
      "Our team trains continuously, so every cut and colour is in experienced hands.",
  },
  {
    icon: Wallet,
    title: "Packages That Fit",
    description:
      "Simple bundles for everyday upkeep, special occasions, and everything between.",
  },
  {
    icon: CalendarCheck,
    title: "Book in a Minute",
    description:
      "Pick your service, choose a time, and get instant confirmation. No phone calls.",
  },
];

const WhySalonBook = () => {
  return (
    <section id="why-salonbook" className="scroll-mt-20 py-20">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            Why SalonBook
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A salon experience built around you
          </h2>
          <p className="mt-4 text-muted-foreground">
            One team, one standard of care — from a quick trim to your wedding
            day.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group rounded-xl border bg-card p-6 text-card-foreground transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <benefit.icon className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-medium">{benefit.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySalonBook;
