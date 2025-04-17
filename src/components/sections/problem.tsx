import BlurFade from "@/components/magicui/blur-fade";
import Section from "@/components/section";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutDashboard, KeyRound, Settings, BarChart3, MessagesSquare, Users, LucideIcon } from "lucide-react";

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

const benefits: Benefit[] = [
  {
    title: "Client-Specific Dashboards",
    description:
      "Easily create and manage dedicated dashboards for each of your clients, providing them with a tailored experience.",
    icon: LayoutDashboard,
  },
  {
    title: "BYO VAPI Integration",
    description:
      "Bring your existing VAPI API key to power the voice agents within your client dashboards seamlessly.",
    icon: KeyRound,
  },
  {
    title: "Client Agent Customization",
    description:
      "Empower your clients to directly edit and customize their AI voice agents through their dedicated dashboard.",
    icon: Settings,
  },
  {
    title: "Performance Analytics",
    description:
      "Provide clients with clear, actionable analytics on their agent's performance directly within their dashboard.",
    icon: BarChart3,
  },
  {
    title: "Conversational Insights",
    description:
      "Enable clients to interact with their call data and analytics through an intuitive chat interface within their dashboard.",
    icon: MessagesSquare,
  },
  {
    title: "Scalable Client Management",
    description:
      "Efficiently manage multiple clients and their voice agent configurations through a centralized platform.",
    icon: Users,
  },
];

export default function Component() {
  return (
    <Section
      title="Build Custom Voice Agent Dashboards for Your Clients"
      subtitle="Empower clients with agent management, analytics, and insights using your VAPI key."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {benefits.map((benefit, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
