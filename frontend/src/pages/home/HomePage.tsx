import DashboardCard from "@/components/Dashboard/DashboardCard";
import ExpiringStockCard from "@/components/Dashboard/ExpiringStockCard";
import MonthlySalesChart from "@/components/Dashboard/MonthlySalesChart";
import PeriodSelector from "@/components/Dashboard/PeriodSelector";
import SalesCard from "@/components/Dashboard/SalesCard";
import Header from "@/components/Header";
import ProfileModal from "@/components/Modal/ProfileModal";
import { usePeriod } from "@/contexts/periodContext";
import {
  mockOverdueSales,
  mockPendingSales,
  mockTotalSalesAmount,
  mockTotalSalesProfit,
  mockTotalStockValue,
} from "@/mocks/dashboardMock";
import productItemService from "@/services/productItemService";
import saleService from "@/services/saleService";
import { isDashboardMockImmediate } from "@/utils/withDashboardMock";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

function HomePage() {
  const { period } = usePeriod();
  const theme = useTheme();

  const mockImmediate = isDashboardMockImmediate();

  const [totalSalesAmount, setTotalSalesAmount] = useState<number | null>(
    mockImmediate ? mockTotalSalesAmount : null,
  );

  const [totalSalesProfit, setTotalSalesProfit] = useState<number | null>(
    mockImmediate ? mockTotalSalesProfit : null,
  );

  const [totalStockValue, setTotalStockValue] = useState<number | null>(
    mockImmediate ? mockTotalStockValue : null,
  );

  const [profileOpen, setProfileOpen] = useState(false);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [{ totalSalesAmount }, { totalSalesProfit }, totalStockValue] =
          await Promise.all([
            saleService.getTotalSalesAmount(period),
            saleService.getTotalSalesProfit(period),
            productItemService.getTotalStockValue(),
          ]);

        setTotalSalesAmount(totalSalesAmount);
        setTotalSalesProfit(totalSalesProfit);
        setTotalStockValue(totalStockValue);
      } catch (error) {
        console.log("Erro ao carregar estatísticas", error);
      }
    };

    loadDashboardData();
  }, [period]);

  const ValueTypography = ({ children }: { children: React.ReactNode }) => (
    <Typography
      variant="h5"
      fontWeight="bold"
      sx={{
        color: theme.palette.mode === "dark" ? "#bbb" : "#EC6B20",
      }}
    >
      {children}
    </Typography>
  );

  return (
    <Box>
      <Header
        title="Home"
        sx={{ mb: 0, mt: 0 }}
        rightContent={
          <IconButton
            color="primary"
            onClick={() => setProfileOpen(true)}
            aria-label="Abrir perfil"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        }
      />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Lucro Total de Vendas (R$)">
            <ValueTypography>
              {totalSalesProfit !== null
                ? formatCurrency(totalSalesProfit)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Valor Bruto de Vendas (R$)">
            <ValueTypography>
              {totalSalesAmount !== null
                ? formatCurrency(totalSalesAmount)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Valor em Estoque (R$)">
            <ValueTypography>
              {totalStockValue !== null
                ? formatCurrency(totalStockValue)
                : "..."}
            </ValueTypography>
          </DashboardCard>
        </Grid>
        
        <Grid size={{ xs: 12, md: 8 }}>
          <DashboardCard
            title={
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                  alignItems: { xs: "stretch", md: "start" },
                  gap: { xs: 1.5, md: 0 },
                  width: "100%",
                }}
              >
                <Typography variant="h6" fontWeight={600}>
                  Gráfico de Vendas
                </Typography>

                <PeriodSelector />
              </Box>
            }
          >
            <MonthlySalesChart />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <DashboardCard title="Vendas Pendentes Quase Vencendo!">
            <SalesCard
              fetchSales={() => saleService.getPendingSales(10)}
              initialData={mockImmediate ? mockPendingSales : undefined}
            />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard title="Estoque Próximos da Validade!">
            <ExpiringStockCard />
          </DashboardCard>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <DashboardCard title="Vendas Pendentes Vencidas!">
            <SalesCard
              fetchSales={() => saleService.getPendingOverdueSales(10)}
              initialData={mockImmediate ? mockOverdueSales : undefined}
            />
          </DashboardCard>
        </Grid>
      </Grid>

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </Box>
  );
}

export default HomePage;
