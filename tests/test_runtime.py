pytest_plugins = "pytester",

def test_pytest_assumptions(testdir):
    class RTPlugin:
        def pytest_runtest_makereport(self, call, item):
            if call.excinfo:
                for traceback_entry in call.excinfo.traceback:
                    print("Location: {}:{}:{}".format(traceback_entry.path,
                                                    traceback_entry.lineno,
                                                    len(str(traceback_entry.statement))))
                    print("CheckOutput: {}".format(traceback_entry.statement))

    testdir.makepyfile("""
    def test_a():
        raise Exception('exception from test_a')
    """)

    testdir.runpytest_inprocess(plugins=[RTPlugin()])

