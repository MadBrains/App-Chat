import { useQuery } from 'src/utils/hooks/useQuery';
import { describe, expect, test } from '@jest/globals';

jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "",
            pathname: "",
            query: "",
            asPath: "",
        };
    },
}));


describe('use Query', () => {
    const useRouter = jest.spyOn(require("next/router"), "useRouter");

    test('undefined params', () => {
        useRouter.mockImplementation(() => ({
            route: "/test",
            pathname: "/",
            query:'',
            asPath: "",
        }));
        expect(useQuery([''])).toEqual({"":""})
    });

    test('2 params', () => {
        useRouter.mockImplementation(() => ({
            route: "/test",
            pathname: "/",
            query:{id:'1', pir:'asd'},
            asPath: "",
        }));
        const {id, pir} = useQuery(['id','pir'])
        expect(id).toEqual('1');
        expect(pir).toEqual('asd');
    });

    test('undefined, NaN query', () => {
        useRouter.mockImplementation(() => ({
            route: "/test",
            pathname: "/",
            query:{id:undefined, pir:NaN},
            asPath: "",
        }));
        const {id, pir} = useQuery(['id','pir'])
        expect(id).toBe('');
        expect(pir).toBe('');
    });

    test('5 queries', () => {
        useRouter.mockImplementation(() => ({
            route: "/test",
            pathname: "/",
            query:{id:undefined, pir:NaN, sort:'1', match:'1', src:undefined},
            asPath: "",
        }));
        expect(useQuery(['id', 'pir', 'sort', 'match','src', 'phone']))
            .toEqual({id:'', pir:'', sort:'1', match:'1', src:'', phone:''})
    });
});
