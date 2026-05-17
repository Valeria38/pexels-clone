import { render } from "@testing-library/react";
import ScrollReset from "./";

describe("ScrollReset Component", () => {
  let originalScrollRestoration: ScrollRestoration;
  const scrollToSpy = jest.fn();
  const requestAnimationFrameSpy = jest.spyOn(window, "requestAnimationFrame");
  const cancelAnimationFrameSpy = jest.spyOn(window, "cancelAnimationFrame");

  beforeEach(() => {
    window.scrollTo = scrollToSpy;

    originalScrollRestoration = window.history.scrollRestoration;
    Object.defineProperty(window.history, "scrollRestoration", {
      value: "auto",
      writable: true,
      configurable: true,
    });

    requestAnimationFrameSpy.mockImplementation((cb: FrameRequestCallback) => {
      cb(0);
      return 1;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (originalScrollRestoration) {
      window.history.scrollRestoration = originalScrollRestoration;
    }
  });

  it("should set scrollRestoration to manual and scroll to top twice on mount", () => {
    render(<ScrollReset />);

    expect(window.history.scrollRestoration).toBe("manual");

    expect(scrollToSpy).toHaveBeenCalledTimes(2);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    expect(requestAnimationFrameSpy).toHaveBeenCalled();
  });

  it("should restore scrollRestoration to auto and cancel animation frame on unmount", () => {
    const { unmount } = render(<ScrollReset />);
    unmount();

    expect(window.history.scrollRestoration).toBe("auto");
    expect(cancelAnimationFrameSpy).toHaveBeenCalledWith(1);
  });
});
