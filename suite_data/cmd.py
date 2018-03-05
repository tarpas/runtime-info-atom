import sqlite3
from lib import hierarchy_from_nodeids, get_carrot_group, get_carrot_group_last_level_in_oneleaf
import json

testmon_nodeids = """test/test_core.py::TestDepGraph::()::test_affected_list
test/test_core.py::TestDepGraph::()::test_affected_list2
test/test_core.py::TestDepGraph::()::test_classes_depggraph
test/test_core.py::TestDepGraph::()::test_dep_graph1
test/test_core.py::TestDepGraph::()::test_dep_graph2
test/test_core.py::TestDepGraph::()::test_dep_graph3
test/test_core.py::TestDepGraph::()::test_dep_graph4
test/test_core.py::TestDepGraph::()::test_dep_graph_new
test/test_core.py::TestDepGraph::()::test_dep_graph_two_modules
test/test_core.py::TestDepGraph::()::test_two_modules_combination
test/test_core.py::TestDepGraph::()::test_two_modules_combination2
test/test_core.py::TestGeneral::()::test_flip
test/test_core.py::TestGeneral::()::test_read_nonexistent
test/test_core.py::TestGeneral::()::test_sqlite_assumption
test/test_core.py::TestGeneral::()::test_write_data
test/test_core.py::TestGeneral::()::test_write_read_data
test/test_core.py::TestGeneral::()::test_write_read_data2
test/test_core.py::TestSourceTree::()::test_basic
test/test_core.py::TestSourceTree::()::test_basic_checksum
test/test_core.py::TestSourceTree::()::test_disappeared
test/test_core.py::TestSourceTree::()::test_get_file
test/test_core.py::TestUnaffected::()::test_nothing_changed
test/test_core.py::TestUnaffected::()::test_simple_change
test/test_process_code.py::TestCoverageAssumptions::test_easy
test/test_process_code.py::TestModule::()::test_3
test/test_process_code.py::TestModule::()::test_base_diff
test/test_process_code.py::TestModule::()::test_classes
test/test_process_code.py::TestModule::()::test_classes_header
test/test_process_code.py::TestModule::()::test_covdata_intersects_deps
test/test_process_code.py::TestReadSrc::()::test_detect_encoding1
test/test_process_code.py::TestReadSrc::()::test_detect_encoding2
test/test_process_code.py::TestReadSrc::()::test_module_with_1250
test/test_process_code.py::TestReadSrc::()::test_read_2lines_file_with_checksum
test/test_process_code.py::TestReadSrc::()::test_read_empty_file_with_checksum
test/test_process_code.py::TestReadSrc::()::test_read_file_with_checksum
test/test_process_code.py::TestSourceIntoBlocks::()::test_2_blocks
test/test_process_code.py::TestSourceIntoBlocks::()::test_change_one
test/test_process_code.py::TestSourceIntoBlocks::()::test_empty
test/test_process_code.py::TestSourceIntoBlocks::()::test_same_but_different_blocks
test/test_process_code.py::TestSourceIntoBlocks::()::test_same_even_names_but_different_blocks
test/test_process_code.py::TestSourceIntoBlocks::()::test_simple
test/test_process_code.py::TestSourceIntoBlocks::()::test_syntax_error
test/test_process_code.py::TestchecksumCoverage::()::test_hit_both[lines0]
test/test_process_code.py::TestchecksumCoverage::()::test_hit_both[lines1]
test/test_process_code.py::TestchecksumCoverage::()::test_hit_first
test/test_process_code.py::TestchecksumCoverage::()::test_hit_first2
test/test_process_code.py::TestchecksumCoverage::()::test_hit_first3
test/test_process_code.py::TestchecksumCoverage::()::test_hit_second
test/test_process_code.py::TestchecksumCoverage::()::test_hit_second_twice
test/test_process_code.py::TestchecksumCoverage::()::test_miss_after
test/test_process_code.py::TestchecksumCoverage::()::test_miss_before
test/test_process_code.py::TestchecksumCoverage::()::test_miss_both[lines0]
test/test_process_code.py::TestchecksumCoverage::()::test_miss_both[lines1]
test/test_subprocess.py::TestCoverageSubprocess::test_basic_run
test/test_subprocess.py::TestCoverageSubprocess::test_coverage_expected_fail
test/test_subprocess.py::TestCoverageSubprocess::test_pass_environ
test/test_subprocess.py::TestCoverageSubprocess::test_subprocess
test/test_testmon.py::TestVariant::()::test_complex
test/test_testmon.py::TestVariant::()::test_empty
test/test_testmon.py::TestVariant::()::test_env
test/test_testmon.py::TestVariant::()::test_header
test/test_testmon.py::TestVariant::()::test_header_nonstr
test/test_testmon.py::TestVariant::()::test_nonsense
test/test_testmon.py::TestVariant::()::test_run_variant_md5
test/test_testmon.py::TestVariant::()::test_separation
test/test_testmon.py::TestXdist::()::test_xdist_4
test/test_testmon.py::TestmonDeselect::()::test_changed_data_version
test/test_testmon.py::TestmonDeselect::()::test_collection_not_abort
test/test_testmon.py::TestmonDeselect::()::test_dependent_testmodule
test/test_testmon.py::TestmonDeselect::()::test_dont_readcoveragerc
test/test_testmon.py::TestmonDeselect::()::test_easy
test/test_testmon.py::TestmonDeselect::()::test_interrupted
test/test_testmon.py::TestmonDeselect::()::test_new
test/test_testmon.py::TestmonDeselect::()::test_new2
test/test_testmon.py::TestmonDeselect::()::test_nonfunc_class
test/test_testmon.py::TestmonDeselect::()::test_nonfunc_class_2
test/test_testmon.py::TestmonDeselect::()::test_not_running_after_failure
test/test_testmon.py::TestmonDeselect::()::test_report_roundtrip
test/test_testmon.py::TestmonDeselect::()::test_run_dissapearing
test/test_testmon.py::TestmonDeselect::()::test_strange_argparse_handling
test/test_testmon.py::TestmonDeselect::()::test_testmon_recursive
test/test_testmon.py::TestmonDeselect::()::test_tlf
test/test_testmon.py::TestmonDeselect::()::test_track_pytest_equal
test/test_testmon.py::TestmonDeselect::()::test_zero_lines_touched"""


def print_testmondata():
    connection = sqlite3.connect('../testmon/.testmondata')

    node_ids = [row[0] for row in
                connection.execute('SELECT name, result FROM node WHERE variant=":python(3, 6)" ORDER BY name')]

    print("\n".join(node_ids))



hierarchy_dict = hierarchy_from_nodeids(testmon_nodeids.splitlines())

with open('carrot_groups.json', 'w') as f:
    f.write(json.dumps(get_carrot_group(hierarchy_dict)[0]))

with open('carrot_groups_last_level_in_one_leaf.json', 'w') as f:
    f.write(json.dumps(get_carrot_group_last_level_in_oneleaf(hierarchy_dict)[0]))
