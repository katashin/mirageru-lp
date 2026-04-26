import { render, screen } from "@testing-library/react";
import { Services } from "@/components/sections/Services";
import { SERVICES } from "@/lib/constants";

describe("Services", () => {
  it("レンダリングされる", () => {
    render(<Services />);
  });

  it("3つのサービスが全て表示される", () => {
    render(<Services />);
    SERVICES.forEach((service) => {
      expect(screen.getByText(service.tagline)).toBeInTheDocument();
    });
  });

  it("各サービスの期間が表示される", () => {
    render(<Services />);
    const durations = SERVICES.map((s) => s.duration);
    durations.forEach((duration) => {
      const elements = screen.getAllByText(duration);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
