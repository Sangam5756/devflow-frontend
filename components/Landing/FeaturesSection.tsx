import { MessageCircleQuestion, Users, Heart, Zap } from "lucide-react";
export default function FeatureSection() {
  const features = [
    {
      icon: MessageCircleQuestion,
      title: "Ask Questions",
      description:
        "Get help from the developer community with detailed, helpful answers.",
    },
    {
      icon: Users,
      title: "Share Knowledge",
      description:
        "Help fellow developers by sharing your expertise and experience.",
    },
    {
      icon: Heart,
      title: "Build Reputation",
      description:
        "Earn likes and build your reputation as a trusted community member.",
    },
    {
      icon: Zap,
      title: "Fast Responses",
      description: "Get quick answers to urgent coding problems and blockers.",
    },
  ];

  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose DevFlow?
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Built by developers, for developers. Experience the best way to
            learn and share knowledge.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group bg-[#040a1a] rounded-xl p-6 text-center border  border-[#1F2937] hover:shadow-slate-600 hover:shadow-sm hover:duration-100 transition"
              >
                <div className="w-12 h-12  bg-[#0c162f] rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:shadow-sm group-hover:bg-[#6490f021] group-hover:shadow-slate-600 group-hover:duration-100 transition">
                  <Icon className="h-6 w-6  text-[#4B6CF7]" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[#9CA3AF]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
