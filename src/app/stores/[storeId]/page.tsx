import { TopNav } from "@/components/layout/TopNav"
import { StoreDetailDashboard } from "@/components/stores/StoreDetailDashboard"

export default async function StorePage({ params }: { params: Promise<{ storeId: string }> }) {
  const { storeId } = await params

  return (
    <>
      <TopNav />
      <StoreDetailDashboard storeId={storeId} />
    </>
  )
}
