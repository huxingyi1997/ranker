/* tslint:disable */
/* eslint-disable */
/**
 * Amazon Clone API
 * v1
 *
 * The version of the OpenAPI document: 1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { Configuration } from './configuration';
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from './common';
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
} from './base';

/**
 *
 * @export
 * @interface CreatePollDto
 */
export interface CreatePollDto {
  /**
   *
   * @type {string}
   * @memberof CreatePollDto
   */
  topic: string;
  /**
   *
   * @type {number}
   * @memberof CreatePollDto
   */
  votesPerVoter: number;
  /**
   *
   * @type {string}
   * @memberof CreatePollDto
   */
  name: string;
}
/**
 *
 * @export
 * @interface CreatePollVo
 */
export interface CreatePollVo {
  /**
   *
   * @type {Poll}
   * @memberof CreatePollVo
   */
  poll: Poll;
  /**
   *
   * @type {string}
   * @memberof CreatePollVo
   */
  accessToken: string;
}
/**
 *
 * @export
 * @interface CreatePollVoUnifiedRes
 */
export interface CreatePollVoUnifiedRes {
  /**
   *
   * @type {CreatePollVo}
   * @memberof CreatePollVoUnifiedRes
   */
  data?: CreatePollVo;
  /**
   *
   * @type {number}
   * @memberof CreatePollVoUnifiedRes
   */
  error?: number;
  /**
   *
   * @type {string}
   * @memberof CreatePollVoUnifiedRes
   */
  error_msg?: string;
}
/**
 *
 * @export
 * @interface JoinPollDto
 */
export interface JoinPollDto {
  /**
   *
   * @type {string}
   * @memberof JoinPollDto
   */
  pollID: string;
  /**
   *
   * @type {string}
   * @memberof JoinPollDto
   */
  name: string;
}
/**
 *
 * @export
 * @interface JoinPollVo
 */
export interface JoinPollVo {
  /**
   *
   * @type {Poll}
   * @memberof JoinPollVo
   */
  poll: Poll;
  /**
   *
   * @type {string}
   * @memberof JoinPollVo
   */
  accessToken: string;
}
/**
 *
 * @export
 * @interface JoinPollVoUnifiedRes
 */
export interface JoinPollVoUnifiedRes {
  /**
   *
   * @type {JoinPollVo}
   * @memberof JoinPollVoUnifiedRes
   */
  data?: JoinPollVo;
  /**
   *
   * @type {number}
   * @memberof JoinPollVoUnifiedRes
   */
  error?: number;
  /**
   *
   * @type {string}
   * @memberof JoinPollVoUnifiedRes
   */
  error_msg?: string;
}
/**
 *
 * @export
 * @interface Nomination
 */
export interface Nomination {
  /**
   *
   * @type {string}
   * @memberof Nomination
   */
  userID: string;
  /**
   *
   * @type {string}
   * @memberof Nomination
   */
  text: string;
}
/**
 *
 * @export
 * @interface Poll
 */
export interface Poll {
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof Poll
   */
  participants: { [key: string]: string };
  /**
   *
   * @type {{ [key: string]: Nomination; }}
   * @memberof Poll
   */
  nominations: { [key: string]: Nomination };
  /**
   *
   * @type {{ [key: string]: Array<string>; }}
   * @memberof Poll
   */
  rankings: { [key: string]: Array<string> };
  /**
   *
   * @type {string}
   * @memberof Poll
   */
  id: string;
  /**
   *
   * @type {string}
   * @memberof Poll
   */
  topic: string;
  /**
   *
   * @type {number}
   * @memberof Poll
   */
  votesPerVoter: number;
  /**
   *
   * @type {Array<Result>}
   * @memberof Poll
   */
  results: Array<Result>;
  /**
   *
   * @type {string}
   * @memberof Poll
   */
  adminID: string;
  /**
   *
   * @type {boolean}
   * @memberof Poll
   */
  hasStarted: boolean;
}
/**
 *
 * @export
 * @interface RejoinPollDto
 */
export interface RejoinPollDto {
  /**
   *
   * @type {string}
   * @memberof RejoinPollDto
   */
  accessToken: string;
}
/**
 *
 * @export
 * @interface RejoinPollVo
 */
export interface RejoinPollVo {
  /**
   *
   * @type {Poll}
   * @memberof RejoinPollVo
   */
  poll: Poll;
}
/**
 *
 * @export
 * @interface RejoinPollVoUnifiedRes
 */
export interface RejoinPollVoUnifiedRes {
  /**
   *
   * @type {RejoinPollVo}
   * @memberof RejoinPollVoUnifiedRes
   */
  data?: RejoinPollVo;
  /**
   *
   * @type {number}
   * @memberof RejoinPollVoUnifiedRes
   */
  error?: number;
  /**
   *
   * @type {string}
   * @memberof RejoinPollVoUnifiedRes
   */
  error_msg?: string;
}
/**
 *
 * @export
 * @interface Result
 */
export interface Result {
  /**
   *
   * @type {string}
   * @memberof Result
   */
  nominationID: string;
  /**
   *
   * @type {string}
   * @memberof Result
   */
  nominationText: string;
  /**
   *
   * @type {number}
   * @memberof Result
   */
  score: number;
}

/**
 * PollsApi - axios parameter creator
 * @export
 */
export const PollsApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     *
     * @param {CreatePollDto} createPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerCreate: async (
      createPollDto: CreatePollDto,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'createPollDto' is not null or undefined
      assertParamExists(
        'pollsControllerCreate',
        'createPollDto',
        createPollDto
      );
      const localVarPath = `/polls`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        createPollDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {JoinPollDto} joinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerJoin: async (
      joinPollDto: JoinPollDto,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'joinPollDto' is not null or undefined
      assertParamExists('pollsControllerJoin', 'joinPollDto', joinPollDto);
      const localVarPath = `/polls/join`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        joinPollDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     *
     * @param {RejoinPollDto} rejoinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerRejoin: async (
      rejoinPollDto: RejoinPollDto,
      options: any = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'rejoinPollDto' is not null or undefined
      assertParamExists(
        'pollsControllerRejoin',
        'rejoinPollDto',
        rejoinPollDto
      );
      const localVarPath = `/polls/rejoin`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: 'POST',
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      localVarHeaderParameter['Content-Type'] = 'application/json';

      setSearchParams(localVarUrlObj, localVarQueryParameter, options.query);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        rejoinPollDto,
        localVarRequestOptions,
        configuration
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * PollsApi - functional programming interface
 * @export
 */
export const PollsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = PollsApiAxiosParamCreator(configuration);
  return {
    /**
     *
     * @param {CreatePollDto} createPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pollsControllerCreate(
      createPollDto: CreatePollDto,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<CreatePollVoUnifiedRes>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.pollsControllerCreate(
          createPollDto,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @param {JoinPollDto} joinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pollsControllerJoin(
      joinPollDto: JoinPollDto,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<JoinPollVoUnifiedRes>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.pollsControllerJoin(
          joinPollDto,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
    /**
     *
     * @param {RejoinPollDto} rejoinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async pollsControllerRejoin(
      rejoinPollDto: RejoinPollDto,
      options?: any
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<RejoinPollVoUnifiedRes>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.pollsControllerRejoin(
          rejoinPollDto,
          options
        );
      return createRequestFunction(
        localVarAxiosArgs,
        globalAxios,
        BASE_PATH,
        configuration
      );
    },
  };
};

/**
 * PollsApi - factory interface
 * @export
 */
export const PollsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = PollsApiFp(configuration);
  return {
    /**
     *
     * @param {CreatePollDto} createPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerCreate(
      createPollDto: CreatePollDto,
      options?: any
    ): AxiosPromise<CreatePollVoUnifiedRes> {
      return localVarFp
        .pollsControllerCreate(createPollDto, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {JoinPollDto} joinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerJoin(
      joinPollDto: JoinPollDto,
      options?: any
    ): AxiosPromise<JoinPollVoUnifiedRes> {
      return localVarFp
        .pollsControllerJoin(joinPollDto, options)
        .then((request) => request(axios, basePath));
    },
    /**
     *
     * @param {RejoinPollDto} rejoinPollDto
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    pollsControllerRejoin(
      rejoinPollDto: RejoinPollDto,
      options?: any
    ): AxiosPromise<RejoinPollVoUnifiedRes> {
      return localVarFp
        .pollsControllerRejoin(rejoinPollDto, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * PollsApi - object-oriented interface
 * @export
 * @class PollsApi
 * @extends {BaseAPI}
 */
export class PollsApi extends BaseAPI {
  /**
   *
   * @param {CreatePollDto} createPollDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PollsApi
   */
  public pollsControllerCreate(createPollDto: CreatePollDto, options?: any) {
    return PollsApiFp(this.configuration)
      .pollsControllerCreate(createPollDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {JoinPollDto} joinPollDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PollsApi
   */
  public pollsControllerJoin(joinPollDto: JoinPollDto, options?: any) {
    return PollsApiFp(this.configuration)
      .pollsControllerJoin(joinPollDto, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   *
   * @param {RejoinPollDto} rejoinPollDto
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PollsApi
   */
  public pollsControllerRejoin(rejoinPollDto: RejoinPollDto, options?: any) {
    return PollsApiFp(this.configuration)
      .pollsControllerRejoin(rejoinPollDto, options)
      .then((request) => request(this.axios, this.basePath));
  }
}