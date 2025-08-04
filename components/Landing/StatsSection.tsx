export default function StatsSection() {
  return (
    <>
      <section className="container mx-auto px-4 py-16">
        <div className="bg-[#040a1a] border border-[#1F2937] rounded-xl p-8 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-[#4B6CF7]">10K+</div>
              <div className="text-[#9CA3AF]">Questions Asked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#34D399]">5K+</div>
              <div className="text-[#9CA3AF]">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#FBBF24]">95%</div>
              <div className="text-[#9CA3AF]">Questions Answered</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
