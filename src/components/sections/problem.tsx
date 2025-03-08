import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, CheckCircle, Clock, Link, Phone, Shield, MessageCircle } from "lucide-react";

const problems = [
  {
    title: "24/7 Availability",
    description:
      "With AI handling your calls, you can be available around the clock, ensuring no opportunity is missed, even outside of business hours.",
    icon: Clock,
  },
  {
    title: "Automated Efficiency",
    description:
      "Automate routine inquiries and appointment scheduling, freeing up your time for more critical tasks.",
    icon: Phone,
  },
  {
    title: "Scalability",
    description:
      "Easily scale your call management as your business grows, with AI handling increased call volumes effortlessly.",
    icon: CheckCircle,
  },
  {
    title: "Insights",
    description:
      "Gain actionable insights from call data analytics, helping you understand customer needs and improve service.",
    icon: BarChart,
  },
  {
    title: "Seamless Integration",
    description:
      "Allow your agents to call webhooks Integrate effortlessly with your existing tools, enhancing your workflow without disruption.",
    icon: Link,
  },
  {
    title: "Chat with Your Data",
    description:
      "Engage in natural conversations with your data, leveraging AI to unlock insights and drive informed decisions.",
    icon: MessageCircle,
  },
];  

export default function Component() {
  return (
    <Section
      title="Key Benefits of AI Call Management"
      subtitle="Transforming how you manage calls with AI."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
