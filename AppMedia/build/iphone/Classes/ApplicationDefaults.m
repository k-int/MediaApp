/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"RCmTQ5O1tldDLQwvCy4m7ip7713O4j8T"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"m3nRAKVKZ2gvkUpK6yvf8tCXSBCTkoma"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"N4lctnaeZMPtqzBmzwptKSDv4es6tEPi"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"iU3zvfMO8G1RPKXnO3ieADCwtl8A0ZXp"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"iNY5aYkYQxMTIJ7AE7fNTpvcDLGuotSB"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"8IzQa8vlVb37ugKs3YKwxyI8EROeh2Rm"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
