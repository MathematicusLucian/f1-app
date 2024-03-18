# -*- coding: utf-8 -*-
from abc import ABCMeta, abstractmethod
from flask import jsonify

class BaseService(object):
    __model__ = None
    __metaclass__ = ABCMeta

    def _isinstance(self, obj, raise_error=True):
        rv = isinstance(obj, self.__model__)
        if not rv and raise_error:
            raise ValueError('%s is not of type %s' % (obj, self.__model__))
        return rv

    @abstractmethod
    def save(self, obj):
        pass

    @abstractmethod
    def all(self):
        pass

    @abstractmethod
    def get(self, obj):
        pass

    @abstractmethod
    def get_all(self, *ids):
        pass