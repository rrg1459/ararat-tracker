import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("recharts", () => {
  const toSerializableProps = (props: Record<string, unknown>) => {
    const { children, ...rest } = props;
    return rest;
  };

  const createMockComponent = (name: string) => {
    return ({ children, ...props }: Record<string, unknown>) => {
      const serializableProps = JSON.stringify(toSerializableProps(props));
      return (
        <div data-testid={name} data-props={serializableProps}>
          {children}
        </div>
      );
    };
  };

  return {
    ResponsiveContainer: createMockComponent("ResponsiveContainer"),
    AreaChart: createMockComponent("AreaChart"),
    Area: createMockComponent("Area"),
    XAxis: createMockComponent("XAxis"),
    YAxis: createMockComponent("YAxis"),
    Tooltip: createMockComponent("Tooltip"),
    CartesianGrid: createMockComponent("CartesianGrid"),
    BarChart: createMockComponent("BarChart"),
    Bar: createMockComponent("Bar"),
    PieChart: createMockComponent("PieChart"),
    Pie: createMockComponent("Pie"),
    Cell: createMockComponent("Cell"),
    Legend: createMockComponent("Legend"),
  };
});

import AttendanceCharts from "./AttendanceCharts";

function setViewportWidth(width: number) {
  Object.defineProperty(window, "innerWidth", {
    configurable: true,
    writable: true,
    value: width,
  });
}

function getProps(element: HTMLElement): Record<string, unknown> {
  return JSON.parse(element.getAttribute("data-props") ?? "{}");
}

const trendData = [
  { date: "2026-07-01", miembros: 20, visitantes: 5, total: 25 },
  { date: "2026-07-08", miembros: 22, visitantes: 7, total: 29 },
];

const compositionData = [
  { name: "Miembros", value: 60 },
  { name: "Visitantes", value: 25 },
  { name: "Lideres", value: 15 },
];

const needsData = [
  { name: "Acepto a Jesus", cantidad: 4 },
  { name: "Pide oracion", cantidad: 7 },
];

const monthlyVisitorsData = [
  { month: "Ene", cantidad: 10 },
  { month: "Feb", cantidad: 12 },
];

describe("AttendanceCharts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setViewportWidth(1024);
  });

  it("renders chart sections and passes data to chart containers", () => {
    render(
      <AttendanceCharts
        trendData={trendData}
        compositionData={compositionData}
        needsData={needsData}
        monthlyVisitorsData={monthlyVisitorsData}
      />,
    );

    expect(screen.getByText("Tendencia de Asistencia")).toBeInTheDocument();
    expect(screen.getByText("Nuevos Visitantes por Mes")).toBeInTheDocument();
    expect(screen.getByText("Composición General")).toBeInTheDocument();
    expect(screen.getByText("Pasos de Fe y Peticiones")).toBeInTheDocument();

    const areaChart = screen.getByTestId("AreaChart");
    const areaProps = getProps(areaChart);
    expect(areaProps.data).toEqual(trendData);

    const barCharts = screen.getAllByTestId("BarChart");
    const monthlyBarProps = getProps(barCharts[0]);
    const needsBarProps = getProps(barCharts[1]);

    expect(monthlyBarProps.data).toEqual(monthlyVisitorsData);
    expect(needsBarProps.data).toEqual(needsData);

    const pie = screen.getByTestId("Pie");
    expect(getProps(pie).data).toEqual(compositionData);
  });

  it("uses desktop chart layout values by default", async () => {
    render(
      <AttendanceCharts
        trendData={trendData}
        compositionData={compositionData}
        needsData={needsData}
        monthlyVisitorsData={monthlyVisitorsData}
      />,
    );

    await waitFor(() => {
      const areaChartProps = getProps(screen.getByTestId("AreaChart"));
      expect(areaChartProps.margin).toEqual({ left: 0, right: 10, top: 10, bottom: 0 });
    });

    const legends = screen.getAllByTestId("Legend");
    expect(getProps(legends[0]).verticalAlign).toBe("top");

    const bars = screen.getAllByTestId("Bar");
    const visitorsBar = bars.find((bar) => getProps(bar).name === "Visitantes");
    expect(visitorsBar).toBeDefined();
    expect(getProps(visitorsBar as HTMLElement).barSize).toBe(60);

    const yAxes = screen.getAllByTestId("YAxis");
    const needsYAxis = yAxes.find((axis) => getProps(axis).dataKey === "name");
    expect(needsYAxis).toBeDefined();
    expect(getProps(needsYAxis as HTMLElement).width).toBe(120);
  });

  it("updates to mobile values when viewport width is less than 640", async () => {
    render(
      <AttendanceCharts
        trendData={trendData}
        compositionData={compositionData}
        needsData={needsData}
        monthlyVisitorsData={monthlyVisitorsData}
      />,
    );

    setViewportWidth(375);
    window.dispatchEvent(new Event("resize"));

    await waitFor(() => {
      const areaChartProps = getProps(screen.getByTestId("AreaChart"));
      expect(areaChartProps.margin).toEqual({ left: -20, right: 5, top: 10, bottom: 0 });
    });

    const legends = screen.getAllByTestId("Legend");
    expect(getProps(legends[0]).verticalAlign).toBe("bottom");

    const bars = screen.getAllByTestId("Bar");
    const visitorsBar = bars.find((bar) => getProps(bar).name === "Visitantes");
    expect(visitorsBar).toBeDefined();
    expect(getProps(visitorsBar as HTMLElement).barSize).toBe(40);

    const yAxes = screen.getAllByTestId("YAxis");
    const needsYAxis = yAxes.find((axis) => getProps(axis).dataKey === "name");
    expect(needsYAxis).toBeDefined();
    expect(getProps(needsYAxis as HTMLElement).width).toBe(70);
  });
});
