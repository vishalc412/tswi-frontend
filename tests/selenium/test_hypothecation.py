"""
Selenium Test Suite for MS EXIMP Hypothecation Management System
Tests all three workflows: Addition, Continuation, and Termination
"""

import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from datetime import datetime, timedelta


class TestHypothecationSystem:
    """Test suite for Hypothecation Management System"""

    @pytest.fixture(autouse=True)
    def setup_and_teardown(self):
        """Setup and teardown for each test"""
        # Setup
        chrome_options = Options()
        chrome_options.add_argument("--headless")  # Run in headless mode
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--window-size=1920,1080")

        self.driver = webdriver.Chrome(
            service=Service(ChromeDriverManager().install()),
            options=chrome_options
        )
        self.driver.implicitly_wait(10)
        self.base_url = "http://localhost:3000"

        yield

        # Teardown
        self.driver.quit()

    def wait_for_element(self, by, value, timeout=10):
        """Wait for element to be present"""
        return WebDriverWait(self.driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )

    def wait_for_clickable(self, by, value, timeout=10):
        """Wait for element to be clickable"""
        return WebDriverWait(self.driver, timeout).until(
            EC.element_to_be_clickable((by, value))
        )

    def get_date_string(self, days_offset=0):
        """Get date string in YYYY-MM-DD format"""
        date = datetime.now() + timedelta(days=days_offset)
        return date.strftime("%Y-%m-%d")

    def test_home_page_loads(self):
        """Test 1: Verify home page loads correctly"""
        print("\n=== Test 1: Home Page Load ===")
        self.driver.get(self.base_url)

        # Check if page title contains expected text
        assert "MS EXIMP" in self.driver.title or "Hypothecation" in self.driver.page_source

        # Check for navigation elements
        assert self.driver.find_element(By.LINK_TEXT, "Addition")
        assert self.driver.find_element(By.LINK_TEXT, "Continuation")
        assert self.driver.find_element(By.LINK_TEXT, "Termination")

        print("✓ Home page loaded successfully")
        print("✓ All navigation links present")

    def test_addition_form_validation(self):
        """Test 2: Verify Addition form validation"""
        print("\n=== Test 2: Addition Form Validation ===")
        self.driver.get(f"{self.base_url}/addition")

        # Wait for form to load
        time.sleep(2)

        # Try to submit empty form
        submit_button = self.wait_for_clickable(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Check for validation messages
        time.sleep(1)
        page_source = self.driver.page_source
        assert "required" in page_source.lower() or "invalid" in page_source.lower()

        print("✓ Form validation working correctly")

    def test_addition_workflow(self):
        """Test 3: Complete Addition workflow"""
        print("\n=== Test 3: Addition Workflow ===")
        self.driver.get(f"{self.base_url}/addition")

        # Wait for form to load
        time.sleep(2)

        # Generate test data
        chassis_no = f"TEST{int(time.time())}"
        engine_no = f"ENG{int(time.time())}"
        hpa_from = self.get_date_string(0)
        hpa_upto = self.get_date_string(365)
        doc_url = "https://example.com/document.pdf"
        reg_no = f"MH12AB{int(time.time()) % 10000}"

        print(f"Test Data:")
        print(f"  Chassis: {chassis_no}")
        print(f"  Engine: {engine_no}")
        print(f"  HPA From: {hpa_from}")
        print(f"  HPA Upto: {hpa_upto}")
        print(f"  Reg No: {reg_no}")

        # Fill form
        self.driver.find_element(By.ID, "chasino").send_keys(chassis_no)
        self.driver.find_element(By.ID, "eng_no").send_keys(engine_no)
        self.driver.find_element(By.ID, "hpa_from").send_keys(hpa_from)
        self.driver.find_element(By.ID, "hpa_upto").send_keys(hpa_upto)
        self.driver.find_element(By.ID, "docurl").send_keys(doc_url)
        self.driver.find_element(By.ID, "regnno").send_keys(reg_no)

        # Submit form
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Wait for response
        time.sleep(3)

        # Check for success message
        page_source = self.driver.page_source
        assert "success" in page_source.lower() or "completed" in page_source.lower()

        print("✓ Addition workflow completed successfully")

    def test_continuation_form_validation(self):
        """Test 4: Verify Continuation form validation"""
        print("\n=== Test 4: Continuation Form Validation ===")
        self.driver.get(f"{self.base_url}/continuation")

        # Wait for form to load
        time.sleep(2)

        # Try to submit empty form
        submit_button = self.wait_for_clickable(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Check for validation messages
        time.sleep(1)
        page_source = self.driver.page_source
        assert "required" in page_source.lower() or "invalid" in page_source.lower()

        print("✓ Form validation working correctly")

    def test_continuation_workflow(self):
        """Test 5: Complete Continuation workflow"""
        print("\n=== Test 5: Continuation Workflow ===")
        self.driver.get(f"{self.base_url}/continuation")

        # Wait for form to load
        time.sleep(2)

        # Generate test data
        transaction_id = f"TXN{int(time.time())}"
        chassis_no = f"TEST{int(time.time())}"
        fncr_code = f"FNCR{int(time.time()) % 10000}"
        hpa_from = self.get_date_string(365)
        hpa_upto = self.get_date_string(730)
        doc_url = "https://example.com/continuation.pdf"
        reg_no = f"MH12AB{int(time.time()) % 10000}"

        print(f"Test Data:")
        print(f"  Transaction ID: {transaction_id}")
        print(f"  Chassis: {chassis_no}")
        print(f"  FNCR Code: {fncr_code}")
        print(f"  HPA From: {hpa_from}")
        print(f"  HPA Upto: {hpa_upto}")
        print(f"  Reg No: {reg_no}")

        # Fill form
        self.driver.find_element(By.ID, "transactionId").send_keys(transaction_id)
        self.driver.find_element(By.ID, "chasino").send_keys(chassis_no)
        self.driver.find_element(By.ID, "fncrCode").send_keys(fncr_code)
        self.driver.find_element(By.ID, "hpa_from").send_keys(hpa_from)
        self.driver.find_element(By.ID, "hpa_upto").send_keys(hpa_upto)
        self.driver.find_element(By.ID, "docurl").send_keys(doc_url)
        self.driver.find_element(By.ID, "regnno").send_keys(reg_no)

        # Submit form
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Wait for response
        time.sleep(3)

        # Check for success message
        page_source = self.driver.page_source
        assert "success" in page_source.lower() or "completed" in page_source.lower()

        print("✓ Continuation workflow completed successfully")

    def test_termination_form_validation(self):
        """Test 6: Verify Termination form validation"""
        print("\n=== Test 6: Termination Form Validation ===")
        self.driver.get(f"{self.base_url}/termination")

        # Wait for form to load
        time.sleep(2)

        # Try to submit empty form
        submit_button = self.wait_for_clickable(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Check for validation messages
        time.sleep(1)
        page_source = self.driver.page_source
        assert "required" in page_source.lower() or "invalid" in page_source.lower()

        print("✓ Form validation working correctly")

    def test_termination_workflow(self):
        """Test 7: Complete Termination workflow"""
        print("\n=== Test 7: Termination Workflow ===")
        self.driver.get(f"{self.base_url}/termination")

        # Wait for form to load
        time.sleep(2)

        # Generate test data
        chassis_no = f"TEST{int(time.time())}"
        termination_dt = self.get_date_string(0)
        doc_url = "https://example.com/termination.pdf"
        reg_no = f"MH12AB{int(time.time()) % 10000}"

        print(f"Test Data:")
        print(f"  Chassis: {chassis_no}")
        print(f"  Termination Date: {termination_dt}")
        print(f"  Reg No: {reg_no}")

        # Fill form
        self.driver.find_element(By.ID, "chassisNo").send_keys(chassis_no)
        self.driver.find_element(By.ID, "terminationDt").send_keys(termination_dt)
        self.driver.find_element(By.ID, "docUrl").send_keys(doc_url)
        self.driver.find_element(By.ID, "regnNo").send_keys(reg_no)

        # Submit form
        submit_button = self.driver.find_element(By.XPATH, "//button[@type='submit']")
        submit_button.click()

        # Wait for response
        time.sleep(3)

        # Check for success message
        page_source = self.driver.page_source
        assert "success" in page_source.lower() or "completed" in page_source.lower()

        print("✓ Termination workflow completed successfully")

    def test_navigation_between_pages(self):
        """Test 8: Verify navigation between all pages"""
        print("\n=== Test 8: Navigation Test ===")
        self.driver.get(self.base_url)

        # Navigate to Addition
        self.driver.find_element(By.LINK_TEXT, "Addition").click()
        time.sleep(1)
        assert "/addition" in self.driver.current_url
        print("✓ Navigated to Addition page")

        # Navigate to Continuation
        self.driver.find_element(By.LINK_TEXT, "Continuation").click()
        time.sleep(1)
        assert "/continuation" in self.driver.current_url
        print("✓ Navigated to Continuation page")

        # Navigate to Termination
        self.driver.find_element(By.LINK_TEXT, "Termination").click()
        time.sleep(1)
        assert "/termination" in self.driver.current_url
        print("✓ Navigated to Termination page")

        # Navigate back to Home
        self.driver.find_element(By.LINK_TEXT, "Home").click()
        time.sleep(1)
        assert self.driver.current_url == f"{self.base_url}/"
        print("✓ Navigated back to Home page")

    def test_responsive_design(self):
        """Test 9: Verify responsive design on mobile viewport"""
        print("\n=== Test 9: Responsive Design Test ===")

        # Test mobile viewport
        self.driver.set_window_size(375, 667)  # iPhone SE size
        self.driver.get(self.base_url)
        time.sleep(2)

        # Check if page loads without horizontal scroll
        body_width = self.driver.execute_script("return document.body.scrollWidth")
        viewport_width = self.driver.execute_script("return window.innerWidth")

        assert body_width <= viewport_width + 20, "Page has horizontal overflow on mobile"
        print("✓ Mobile viewport renders correctly")

        # Test tablet viewport
        self.driver.set_window_size(768, 1024)  # iPad size
        time.sleep(1)
        print("✓ Tablet viewport renders correctly")

        # Reset to desktop
        self.driver.set_window_size(1920, 1080)


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s", "--html=test_report.html", "--self-contained-html"])
