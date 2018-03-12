from addlib import add1

def multiply(a, b):
    result = 0
    for i in range(a):
        result = add1(result, b)
    return result
