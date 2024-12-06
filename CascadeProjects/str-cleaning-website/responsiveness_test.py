from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time

# Screen sizes to test
SCREEN_SIZES = [
    {"name": "Mobile", "width": 375, "height": 812},    # iPhone X
    {"name": "Tablet", "width": 768, "height": 1024},   # iPad
    {"name": "Small Desktop", "width": 1024, "height": 768},
    {"name": "Large Desktop", "width": 1920, "height": 1080}
]

def setup_driver():
    """Set up Chrome WebDriver with options."""
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run in background
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_options)
    return driver

def test_responsiveness(url):
    """Comprehensive responsiveness testing."""
    driver = setup_driver()
    test_results = {}

    try:
        for screen in SCREEN_SIZES:
            # Set browser window size
            driver.set_window_size(screen['width'], screen['height'])
            driver.get(url)
            time.sleep(2)  # Allow page to load

            # Take screenshot
            screenshot_path = f"C:/Users/User/CascadeProjects/str-cleaning-website/responsiveness_screenshots/{screen['name']}_screenshot.png"
            driver.save_screenshot(screenshot_path)

            # Check navigation visibility based on screen size
            is_mobile = screen['width'] < 769
            nav_check = check_navigation_visibility(driver, is_mobile)

            # Check key elements
            test_results[screen['name']] = {
                "Navigation Visible": nav_check,
                "Hero Section Intact": is_element_visible(driver, ".neighborhood-hero"),
                "Features Section Responsive": check_features_responsive(driver),
                "CTA Button Clickable": is_element_clickable(driver, ".cta-button"),
                "Testimonials Visible": is_element_visible(driver, ".testimonial-section")
            }

    except Exception as e:
        print(f"Error during testing: {e}")
    finally:
        driver.quit()

    return test_results

def check_navigation_visibility(driver, is_mobile):
    """Check navigation visibility based on screen size."""
    try:
        if is_mobile:
            # Check mobile navigation elements
            hamburger = driver.find_element("css selector", ".hamburger-menu")
            mobile_nav = driver.find_element("css selector", ".mobile-nav")
            return hamburger.is_displayed() and mobile_nav is not None
        else:
            # Check desktop navigation
            nav_links = driver.find_element("css selector", ".nav-links")
            return nav_links.is_displayed()
    except Exception as e:
        print(f"Navigation visibility check failed: {e}")
        return False

def is_element_visible(driver, selector):
    """Check if an element is visible."""
    try:
        element = driver.find_element("css selector", selector)
        return element.is_displayed()
    except:
        return False

def is_element_clickable(driver, selector):
    """Check if an element is clickable."""
    try:
        element = driver.find_element("css selector", selector)
        return element.is_enabled() and element.is_displayed()
    except:
        return False

def check_features_responsive(driver):
    """Check if features section is responsive."""
    try:
        features = driver.find_elements("css selector", ".feature")
        return len(features) > 0
    except:
        return False

def generate_report(results):
    """Generate a human-readable test report."""
    report = "Responsiveness Test Report\n"
    report += "=" * 30 + "\n\n"

    for screen, checks in results.items():
        report += f"{screen} Screen:\n"
        for check, passed in checks.items():
            status = "PASS" if passed else "FAIL"
            report += f"  {check}: {status}\n"
        report += "\n"

    with open("C:/Users/User/CascadeProjects/str-cleaning-website/responsiveness_report.txt", "w", encoding='utf-8') as f:
        f.write(report)

    print("Responsiveness test complete. Report generated.")

# Run the test
url = "file:///C:/Users/User/CascadeProjects/str-cleaning-website/navy-yard.html"
results = test_responsiveness(url)
generate_report(results)
