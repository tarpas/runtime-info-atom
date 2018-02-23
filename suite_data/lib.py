from collections import defaultdict
import re


def len_f(label):
    return len(label)


def get_carrot_group(data):
    json_elements = []
    total_weight = 0
    for label in data:
        element = {'label': label}
        element['weight'] = len(label)
        if data[label]:
            groups, weight = get_carrot_group(data[label])
            element['weight'] = weight
            element['groups'] = groups

        total_weight += element['weight']
        json_elements.append(element)

    return json_elements, total_weight


def get_carrot_group_last_level_in_oneleaf(data, level=0):
    if level == 2:
        return get_test_leaf(data)
    json_elements = []
    total_weight = 100

    for label in data:
        element = {'label': label}
        element['weight'] = len(label)
        if data[label]:
            groups, weight = get_carrot_group_last_level_in_oneleaf(data[label], level + 1)
            element['weight'] = weight
            element['groups'] = groups

        total_weight += element['weight']
        json_elements.append(element)

    return json_elements, total_weight


def get_test_leaf(data):
    weight = sum(len(test) + 3 for test in data)
    return [{'label': ' -- '.join(data.keys()), 'weight': weight}], weight


def hierarchy_from_nodeids(node_ids):
    def defa():
        return defaultdict(defa)

    result = defa()

    g = []

    for s in node_ids:
        elements = [element for element in s.split('::') if element != '()']
        a = [re.match('test/test_(.*)\.py.*', elements[0]).group(1)]
        a.append(re.match('Test(.*)', elements[1]).group(1))
        label = re.match('test_(.*)', elements[2]).group(1)
        a.append(label)
        g.append(a[2])

        result[a[0]][a[1]][a[2]] = None

    return result