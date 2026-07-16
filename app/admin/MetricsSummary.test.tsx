import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import MetricsSummary from "./MetricsSummary";

describe("MetricsSummary", () => {
  it("renders all metric titles", () => {
    render(<MetricsSummary />);

    expect(screen.getByText("Total de miembros")).toBeInTheDocument();
    expect(screen.getByText("Total de visitantes")).toBeInTheDocument();
    expect(screen.getByText("Promedio de Tasa de Asistencia")).toBeInTheDocument();
    expect(screen.getByText("Nuevos visitantes (este mes)")).toBeInTheDocument();
    expect(screen.getByText("Nuevos visitantes (esta semana)")).toBeInTheDocument();
    expect(screen.getByText("Visitantes Recurrentes")).toBeInTheDocument();
  });

  it("uses default values when no props are provided", () => {
    render(<MetricsSummary />);

    expect(screen.getByText("0%")).toBeInTheDocument();

    const plusZeroValues = screen.getAllByText("+0");
    expect(plusZeroValues).toHaveLength(3);

    const plainZeroValues = screen.getAllByText("0");
    expect(plainZeroValues.length).toBeGreaterThanOrEqual(2);
  });

  it("renders provided metric values with expected formatting", () => {
    render(
      <MetricsSummary
        totalMembers={120}
        totalVisitors={35}
        averageAttendanceRate={82.5}
        newVisitorsThisMonth={9}
        newVisitorsThisWeek={3}
        returningVisitors={11}
      />,
    );

    expect(screen.getByText("120")).toBeInTheDocument();
    expect(screen.getByText("35")).toBeInTheDocument();
    expect(screen.getByText("82.5%")).toBeInTheDocument();
    expect(screen.getByText("+9")).toBeInTheDocument();
    expect(screen.getByText("+3")).toBeInTheDocument();
    expect(screen.getByText("+11")).toBeInTheDocument();
  });
});
