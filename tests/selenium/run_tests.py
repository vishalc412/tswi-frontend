#!/usr/bin/env python3
"""
Test Runner for MS EXIMP Hypothecation Management System
Runs all Selenium tests and generates a report
"""

import sys
import subprocess
import os
from datetime import datetime


def print_banner():
    """Print test banner"""
    print("=" * 70)
    print("MS EXIMP Hypothecation Management - Automated Test Suite")
    print("=" * 70)
    print(f"Started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)
    print()


def check_requirements():
    """Check if all requirements are installed"""
    try:
        import selenium
        import pytest
        from webdriver_manager.chrome import ChromeDriverManager
        print("✓ All Python requirements are installed")
        return True
    except ImportError as e:
        print(f"✗ Missing requirement: {e}")
        print("\nPlease install requirements:")
        print("  pip install -r tests/selenium/requirements.txt")
        return False


def check_server():
    """Check if Next.js server is running"""
    try:
        import urllib.request
        urllib.request.urlopen("http://localhost:3000", timeout=2)
        print("✓ Next.js server is running on http://localhost:3000")
        return True
    except:
        print("✗ Next.js server is not running")
        print("\nPlease start the server:")
        print("  npm run dev")
        return False


def run_tests():
    """Run the test suite"""
    print("\nRunning test suite...")
    print("-" * 70)

    # Get the directory of this script
    test_dir = os.path.dirname(os.path.abspath(__file__))
    test_file = os.path.join(test_dir, "test_hypothecation.py")
    report_file = os.path.join(test_dir, "test_report.html")

    # Run pytest
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "pytest",
            test_file,
            "-v",
            "-s",
            f"--html={report_file}",
            "--self-contained-html"
        ],
        cwd=test_dir
    )

    print("-" * 70)

    if result.returncode == 0:
        print("\n✓ All tests passed!")
        print(f"\nTest report generated: {report_file}")
    else:
        print("\n✗ Some tests failed")
        print(f"\nCheck the test report: {report_file}")

    return result.returncode


def main():
    """Main function"""
    print_banner()

    # Check requirements
    if not check_requirements():
        sys.exit(1)

    print()

    # Check server
    if not check_server():
        print("\nNote: Tests require the Next.js development server to be running.")
        print("Start it in another terminal with: npm run dev")
        sys.exit(1)

    print()

    # Run tests
    exit_code = run_tests()

    print()
    print("=" * 70)
    print(f"Completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 70)

    sys.exit(exit_code)


if __name__ == "__main__":
    main()
