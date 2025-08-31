import StatsGrid from "./StatsGrid";
import RecentActivity from "./RecentActivity";
import ActionCards from "./ActionCards";

export default function OverviewTab({
  isHost,
  stats,
  formatPrice,
  setActiveTab,
}) {
  return (
    <div className="space-y-6">
      <StatsGrid isHost={isHost} stats={stats} formatPrice={formatPrice} />
      <RecentActivity />
      <ActionCards isHost={isHost} setActiveTab={setActiveTab} />
    </div>
  );
}
