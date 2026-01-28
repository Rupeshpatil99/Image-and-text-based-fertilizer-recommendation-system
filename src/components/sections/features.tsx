import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UploadCloud, ClipboardList, Sparkles } from "lucide-react";

const features = [
  {
    icon: <UploadCloud className="h-10 w-10 text-primary" />,
    title: "Upload Crop Image",
    description: "Snap a photo of your crops and upload it instantly. Our AI analyzes the visual data to assess plant health."
  },
  {
    icon: <ClipboardList className="h-10 w-10 text-primary" />,
    title: "Provide Details",
    description: "Add key information about your field conditions and any prior inputs to give our AI the full picture."
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Get Recommendations",
    description: "Receive immediate, data-driven advice on the best fertilizer type and quantity for optimal growth."
  }
];

export default function Features() {
  return (
    <section className="py-16 sm:py-24 bg-card">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold font-headline sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A simple three-step process to unlock your farm's full potential.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="pt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
