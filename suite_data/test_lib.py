import json

from lib import get_carrot_group, hierarchy_from_nodeids

node_ids = """test/test_core.py::TestDeselect::()::test_simple
test/test_core.py::TestCoverageAssumptions::()::test_before
test/test_core.py::TestCoverageAssumptions::()::test_etc
""".splitlines()

hierarchy_dict = {'core':
                      {'Deselect': {'simple': None,
                                    },
                       'CoverageAssumptions': {'before': None,
                                               'etc': None}
                       }
                  }


def test_leaf():
    assert json.dumps(get_carrot_group(hierarchy_dict['core']['CoverageAssumptions'])[
                          0]) == '[{"label": "before", "weight": 6}, {"label": "etc", "weight": 3}]'


def test_groups():
    groups = get_carrot_group(hierarchy_dict['core'])[0]
    print(json.dumps(groups))
    assert [d['label'] for d in groups] == ['Deselect', 'CoverageAssumptions']
    assert groups[0]['groups'][0]['label'] == 'simple'
    with open('s1.json', 'w') as f:
        f.write(json.dumps(groups))


def test_hierarchy_from_nodeids():
    assert hierarchy_from_nodeids(node_ids) == hierarchy_dict
